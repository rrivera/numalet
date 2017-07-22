interface Opciones {
  unidad?: string | false | null
  mayus?: boolean
}

declare function numalet (opciones?: Opciones): (n: number) => string;

export = numalet
