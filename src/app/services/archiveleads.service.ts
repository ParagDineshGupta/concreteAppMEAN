import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class ArchiveleadsService {

  private archiveLeadsUrl = 'leads/archiveleads'
  
  constructor(private http: BaseService) { }

  getArchiveLeads(count:any){
    return this.http.post(this.archiveLeadsUrl, {count:count});
  }
}
