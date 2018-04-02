import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class DashboardService {
  private allQuotesUrl:any = '';
  private aQuoteUrl = 'respondtoquote';
  private delQuoteUrl = 'removequote';

  constructor(private http: BaseService  ) { }

  getAllQuotes(){
    return this.http.get(this.allQuotesUrl);
  }

  answerQuote (data: any) {
     return this.http.post(this.aQuoteUrl,data);
  }

  deleteQuote (data:any) {
    return this.http.post(this.delQuoteUrl, data);
  }
}
