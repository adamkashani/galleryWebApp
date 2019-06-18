import { Photo } from './photo';

export class Photos {
    constructor(
       public page?:number,
       public pages?: number,
       public perpage?: number,
       public photo?: Array<Photo>,
       public total?: string
    ) { }
}