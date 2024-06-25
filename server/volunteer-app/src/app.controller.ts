import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// const QRCode = require('qrcode');

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): any {
        return this.appService.getHello();

        /* QRCode.toString(`Hi I'm Daisy!`, { type: 'terminal' }, function (err, url) {
      console.log(`${typeof url}\n${url.toString()}`);
    }); */
    }
}
