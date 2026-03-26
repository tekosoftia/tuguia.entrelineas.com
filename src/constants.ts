export const EDUCATION_CONTENT = [
  {
    id: '1',
    title: '¿Qué es la menstruación?',
    excerpt: 'Es un proceso natural donde tu cuerpo se prepara para crecer.',
    content: `La menstruación, o periodo, es cuando sale un poco de sangre por la vagina. ¡No te asustes! Es algo totalmente normal que le pasa a casi todas las mujeres y niñas cuando crecen. 
    
    Tu cuerpo está practicando para cuando seas adulta. Suele durar entre 3 y 7 días y ocurre aproximadamente una vez al mes.`,
    category: 'Básico',
    icon: 'info',
    minAge: 9
  },
  {
    id: '2',
    title: 'Higiene y cuidados',
    excerpt: 'Cómo sentirte limpia y cómoda todo el día.',
    content: `Es importante cambiar tu toalla sanitaria cada 3 o 4 horas para evitar olores y sentirte fresca. 
    
    Lava tu zona íntima solo con agua o un jabón muy suave. ¡Y no olvides lavar bien tus manos antes y después de cada cambio!`,
    category: 'Higiene',
    icon: 'droplets',
    minAge: 9
  },
  {
    id: '3',
    title: 'Aliviar los cólicos',
    excerpt: 'Pequeños trucos para cuando sientas molestias.',
    content: `Si sientes dolor en la parte baja de tu pancita, puedes probar:
    1. Ponerte una bolsita de agua tibia.
    2. Tomar un té de manzanilla calientito.
    3. Descansar un poco o hacer estiramientos suaves.
    
    Si el dolor es muy fuerte, siempre avísale a un adulto de confianza.`,
    category: 'Cuidado',
    icon: 'coffee',
    minAge: 9
  }
];

export interface HygieneStep {
  title: string;
  description: string;
  imageUrl: string;
}

export interface HygieneMethod {
  id: string;
  title: string;
  description: string;
  advantages: string[];
  hygieneTips: string[];
  steps: HygieneStep[];
  minAge: number;
  icon: string;
  mainImage: string;
}

export const HYGIENE_METHODS: HygieneMethod[] = [
  {
    id: 'pads',
    title: 'Toallas Higiénicas',
    description: 'Son suaves y se pegan a tu ropa interior. ¡Son las mejores para empezar!',
    advantages: ['Muy fáciles de usar', 'Vienen en muchos tamaños', 'No se sienten dentro de ti'],
    hygieneTips: ['Cámbiala cada 3-4 horas', 'Desecha en el basurero, nunca en el inodoro'],
    minAge: 9,
    icon: 'droplets',
    mainImage: 'https://picsum.photos/seed/luna-sanitary-pad/800/600',
    steps: [
      {
        title: 'Paso 1: Preparar',
        description: 'Lava muy bien tus manos con agua y jabón. Ten tu toalla lista en su empaque.',
        imageUrl: 'https://picsum.photos/seed/luna-wash-hands-prep/400/300'
      },
      {
        title: 'Paso 2: Colocar',
        description: 'Retira el papel protector y pega la toalla en el centro de tu ropa interior.',
        imageUrl: 'https://picsum.photos/seed/luna-place-pad/400/300'
      },
      {
        title: 'Paso 3: Ajustar',
        description: 'Asegúrate de que esté bien centrada. Si tiene alitas, dóblalas hacia afuera para sujetarla mejor.',
        imageUrl: 'https://picsum.photos/seed/luna-adjust-wings/400/300'
      },
      {
        title: 'Paso 4: Cambio',
        description: 'Cuando sientas humedad o después de unas horas, retira la toalla usada con cuidado.',
        imageUrl: 'https://picsum.photos/seed/luna-change-pad/400/300'
      },
      {
        title: 'Paso 5: Desechar',
        description: 'Envuelve la toalla usada en papel higiénico y ponla en el basurero. ¡Nunca al inodoro!',
        imageUrl: 'https://picsum.photos/seed/luna-dispose-trash/400/300'
      }
    ]
  },
  {
    id: 'tampons',
    title: 'Tampones',
    description: 'Se usan dentro de ti y son geniales para hacer deporte o nadar.',
    advantages: ['Muy discretos', 'Ideales para nadar', 'Libertad de movimiento'],
    hygieneTips: ['Cámbialo cada 4-6 horas', 'No lo dejes puesto más de 8 horas'],
    minAge: 12,
    icon: 'info',
    mainImage: 'https://picsum.photos/seed/luna-tampon-main/800/600',
    steps: [
      {
        title: 'Paso 1: Preparar',
        description: 'Lava tus manos. Revisa que el empaque del tampón esté cerrado y limpio.',
        imageUrl: 'https://picsum.photos/seed/luna-tampon-prep/400/300'
      },
      {
        title: 'Paso 2: Posición',
        description: 'Busca una posición cómoda, como sentada en el inodoro o con un pie sobre una silla.',
        imageUrl: 'https://picsum.photos/seed/luna-tampon-pose/400/300'
      },
      {
        title: 'Paso 3: Inserción',
        description: 'Introduce el tampón suavemente siguiendo el ángulo natural de tu cuerpo.',
        imageUrl: 'https://picsum.photos/seed/luna-tampon-insert/400/300'
      },
      {
        title: 'Paso 4: Cambio',
        description: 'Recuerda cambiarlo cada 4 a 6 horas para mantenerte siempre fresca y segura.',
        imageUrl: 'https://picsum.photos/seed/luna-tampon-clock/400/300'
      }
    ]
  },
  {
    id: 'cup',
    title: 'Copa Menstrual',
    description: 'Es una copita de silicona que recolecta el flujo. ¡Es amigable con el planeta!',
    advantages: ['Dura muchos años', 'No genera basura', 'Puedes usarla hasta 12 horas'],
    hygieneTips: ['Lávala bien con agua y jabón neutro', 'Esterilízala al final de cada periodo'],
    minAge: 14,
    icon: 'moon',
    mainImage: 'https://picsum.photos/seed/luna-menstrual-cup/800/600',
    steps: [
      {
        title: 'Paso 1: Doblar',
        description: 'Lava tus manos. Dobla la copa en forma de C o U para que sea más fácil de introducir.',
        imageUrl: 'https://picsum.photos/seed/luna-cup-fold/400/300'
      },
      {
        title: 'Paso 2: Colocar',
        description: 'Introdúcela suavemente. La copa se abrirá sola para recolectar el flujo sin derrames.',
        imageUrl: 'https://picsum.photos/seed/luna-cup-place/400/300'
      },
      {
        title: 'Paso 3: Retirar',
        description: 'Presiona la base suavemente para romper el vacío y retírala con un movimiento lento.',
        imageUrl: 'https://picsum.photos/seed/luna-cup-remove/400/300'
      }
    ]
  }
];

export const MOODS: { type: string; label: string; icon: string; color: string }[] = [
  { type: 'happy', label: 'Feliz', icon: '😊', color: 'bg-yellow-100' },
  { type: 'sensitive', label: 'Sensible', icon: '🥺', color: 'bg-blue-100' },
  { type: 'tired', label: 'Cansada', icon: '😴', color: 'bg-purple-100' },
  { type: 'calm', label: 'Tranquila', icon: '😌', color: 'bg-green-100' },
  { type: 'annoyed', label: 'Molesta', icon: '😤', color: 'bg-red-100' },
];

export const THEMES = [
  { id: 'luna', label: 'Luna', bg: '#FDFBF7', primary: '#5A5A40', accent: '#FF8080', text: '#4A4A40' },
  { id: 'rose', label: 'Rosa', bg: '#FFF5F5', primary: '#A64D79', accent: '#FFB7B7', text: '#4A1E33' },
  { id: 'sky', label: 'Cielo', bg: '#F0F7FF', primary: '#4A7BA6', accent: '#B7D9FF', text: '#1E334A' },
  { id: 'forest', label: 'Bosque', bg: '#F5FDF5', primary: '#405A40', accent: '#80FF80', text: '#404A40' },
  { id: 'night', label: 'Noche', bg: '#1A1A1A', primary: '#A080FF', accent: '#FF80FF', text: '#F5F2ED' },
];
