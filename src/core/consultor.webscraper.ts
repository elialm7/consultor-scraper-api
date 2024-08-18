import puppeteer, { Browser, HTTPResponse, Page } from "puppeteer";
import { IConsultorWebScraper } from "../types/consultor.interfaces";
import { StatusCodes } from "http-status-codes";
import { ScraperErrorType, ScraperException } from "../error/scraper.error";


export class ConsultorWebScraper implements IConsultorWebScraper{
    private urls = {
        login_page:'http://servicios.fpune.edu.py:82/consultor/', 
        error_page:'http://servicios.fpune.edu.py:82/consultor/Error.html'
    };
    private cedula: string; 
    private password: string;
    public constructor(cedula: string, password: string){
        this.cedula = cedula; 
        this.password = password;
    }


    public async scrape(): Promise<string> {
        try{
            const pup_browser_options = {
                headless: true
            };
            const browser: Browser = await puppeteer.launch(pup_browser_options);
            const page: Page = await browser.newPage();
            let login_response: HTTPResponse = await page.goto(
                this.urls.login_page, 
                {
                    waitUntil: "networkidle2"
                }
            ) as HTTPResponse;
            if(login_response.status() != StatusCodes.OK){
                throw ScraperException.New({
                    message: `Error de pagina inesperado`, 
                    type: ScraperErrorType.UNEXPECTED_LOGIN_ERROR, 
                    reason: `codigo de error de pagina: ${login_response.status()}`
                });
            }
            const cedula_selector: string = 'input[name="usuario"]';
            const contrasenia_selector:string = 'input[name="clave"]';
            const login_button_selector:string = 'button[type="submit"]';

            await page.type(cedula_selector, this.cedula);
            await page.type(contrasenia_selector, this.password);
            await Promise.all([page.click(login_button_selector),
            page.waitForNavigation({waitUntil:'networkidle2'})]);
            if(page.url() === this.urls.error_page){
                throw ScraperException.New({
                    message: "cedula/password incorrectos", 
                    type: ScraperErrorType.INVALID_AUTH_STUDENT_ERROR
                });
            }

            return page.content();
        }catch(error){
            if(error instanceof ScraperException){
                throw error;
            }else{
                throw ScraperException.New({
                    message:'Se ha producido un error inesperado', 
                    type: ScraperErrorType.UNEXPECTED_ERROR, 
                    reason: (error as Error).message
                });
            }
        }
           
    }
}