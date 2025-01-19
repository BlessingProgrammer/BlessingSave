export class Data {
    thumbnail?: string | null;
    music?: string | null;
    hd?: string | null;
    full_hd?: string | null;

    constructor(thumbnail?: string, music?: string, hd?: string, full_hd?: string) {
        this.thumbnail = thumbnail ?? null;
        this.music = music ?? null;
        this.hd = hd ?? null;
        this.full_hd = full_hd ?? null;
    }
}

