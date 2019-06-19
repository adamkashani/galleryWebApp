export class Photo {
    constructor(
        public farm?: number,
        public id?: string,
        public isfamily?: number,
        public isfriend?: number,
        public ispublic?: number,
        public owner?: string,
        public secret?: string,
        public server?: string,
        public title?: string,
        public urlImage?: string,
        public minSizeUrl?: string,
        public maxSizeUrl: string = null
    ) { }
}