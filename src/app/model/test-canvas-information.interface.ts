import { Image } from './image.interface';

export interface TestCanvasInformation {
    id: string;
    name: string;
    datePublished: Date;
    description?: string;
    image?: Image;
}
