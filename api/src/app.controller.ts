import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':handle')
  getProfile(@Param('handle') handle: string) {
    return this.appService.getProfile(handle);
  }

  @Post('image')
  async getImage(@Body() { url }: any, @Response() res: Res) {
    const fileBuffer = await this.appService.getImage(url);

    res.writeHead(200, {
      'Content-Disposition': 'attachment;filename=' + encodeURI('file-name.jpg'),
      'Content-Type': 'image/jpg',
      'Content-Length': fileBuffer.length,
    });
    res.write(fileBuffer);
    res.end();
  }
}
