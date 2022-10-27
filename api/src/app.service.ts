import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  catchError,
  filter,
  firstValueFrom,
  map,
  of,
  repeat,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  URL = 'http://api.scraping-bot.io/scrape/data-scraper';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getProfile(handle: string) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.configService.get('AUTH')}`,
      },
    };

    const data = `{
      "account": "${handle}", 
      "scraper": "instagramProfile"
    }`;

    return this.httpService
      .post(this.URL, data, config)
      .pipe(
        switchMap((response: AxiosResponse<{ responseId: string }>) =>
          timer(10000).pipe(
            switchMap(() => this.getProfileDetails(response.data.responseId)),
          ),
        ),
      );
  }

  getProfileDetails(responseId: string) {
    const detailUrl = `${this.URL}-response?responseId=${responseId}&scraper=instagramProfile`;

    const config = {
      headers: {
        Authorization: `Basic ${this.configService.get('AUTH')}`,
      },
    };

    return this.httpService.get(detailUrl, config).pipe(
      repeat({ count: 4, delay: 7000 }),
      filter((data) => data.data['status'] !== 'pending'),
      catchError((error) => {
        console.log(error);

        return of(error);
      }),
      map((m) => m.data),
      take(1),
    );
  }

  async getImage(url: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { responseType: 'arraybuffer' }),
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }

    throw new HttpException('Could not download image', 500);
  }
}
