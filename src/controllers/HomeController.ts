import { injectable, inject } from 'inversify';
import { Router, Request, Response } from 'express';
import HomeService from '../services/HomeService';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export default class HomeController {

    constructor(@inject('HomeService') private readonly homeService: HomeService) { }

    @httpGet('/')
    public async home(request: Request, response: Response) {
        const data = await this.homeService.home();
        return response.status(200).json(data);
    }

}