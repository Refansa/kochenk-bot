import { Client, ClientOptions, Collection } from 'discord.js';

import { Command } from '../commands/index.js';

export class CustomClient extends Client {
    constructor(clientOptions: ClientOptions) {
        super(clientOptions);
    }
    
    openAPI: any;
    
    public commands: Collection<string, Command> = new Collection();
}
