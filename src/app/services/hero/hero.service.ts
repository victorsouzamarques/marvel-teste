import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';

const PRIV_KEY = "73364c20526d5556636e15b5014ae19058368adf";
const PUBLIC_KEY = "fe92b2b1c635677be82ef62edf7b3189";
@Injectable()
export class HeroService {

  constructor( public http: HttpClient) { }

  loadHero(){
    let ts = new Date().getTime().toString();
    let hash = Md5.hashStr(ts + PRIV_KEY + PUBLIC_KEY);
    let authorization = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    let path = `/characters?limit=100&`;
    let url = `https://gateway.marvel.com:443/v1/public`;

    let fullUrl = `${url}${path}${authorization}`;
    console.log(fullUrl);
    return this.http.get<any>(fullUrl);
  } 
}
