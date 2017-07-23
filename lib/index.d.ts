interface Opciones {
  unidad?: string | false | null
  mayus?: boolean
  centavosSiempre?: boolean
}

declare function numalet (opciones?: Opciones): (n: number) => string;

export = numalet
