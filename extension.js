class LospecPaletteExtension {
    getInfo() {
        return {
            id: 'lospecpalette',
            name: 'Lospec Palettes',
            color1: '#37273d',  
            color2: '#493254',  
            color3: '#714d80',  
            blocks: [
                {
                    opcode: 'getPaletteData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get [format] data from palette [paletteName]',
                    arguments: {
                        format: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'dataFormats',
                            defaultValue: 'json'
                        },
                        paletteName: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Tropical Fruit 04'
                        }
                    }
                }
            ],
            menus: {
                dataFormats: {
                    acceptReporters: true,
                    items: ['json', 'csv']
                }
            }
        };
    }

    convertToSlug(paletteName) {
        return paletteName
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^a-z0-9\-]/g, '');
    }

    getPaletteData(args) {
        const format = args.format;
        const paletteName = args.paletteName;
        const slug = this.convertToSlug(paletteName);
        const url = `https://lospec.com/palette-list/${slug}.${format}`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    return `${paletteName} not found`;
                }
                return response.text();
            })
            .then(data => {
                if (format === 'json') {
                    return JSON.stringify(JSON.parse(data));
                }
                return data;
            })
            .catch(error => {
                return `Error fetching palette: ${error.message}`;
            });
    }
}

Scratch.extensions.register(new LospecPaletteExtension());
