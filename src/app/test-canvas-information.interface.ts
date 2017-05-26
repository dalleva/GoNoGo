import { Image } from './image.interface';

export interface TestCanvasInformation {
    id: string;
    name: string;
    description?: string;
    image?: Image;
}
