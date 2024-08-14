import { IConsultorWebScraper } from "../types/consultor.interfaces";


export class ConsultorWebScraper implements IConsultorWebScraper{



    public constructor(){


    }

    public async scrape(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}