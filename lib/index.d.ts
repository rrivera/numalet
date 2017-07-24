interface Opciones {
  unidad?: string | false | null
  mayus?: boolean
  decimalesSiempre?: boolean
}

declare function numalet (opciones?: Opciones): (n: number) => string;

export = numalet
