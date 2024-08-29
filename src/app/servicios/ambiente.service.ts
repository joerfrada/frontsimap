export enum TipoAmbiente {
    Local,
    Produccion,
    Pruebas
}

export class Enviroment {

    backend(ambiente: TipoAmbiente) {
        switch (ambiente) {
            case TipoAmbiente.Local:
                return "https://localhost:7135/api/";
            case TipoAmbiente.Produccion:
                return "https://prod.sinte.co/api/";
            case TipoAmbiente.Pruebas:
                return "https://www.sinte.co/api/";
        }
    }
}