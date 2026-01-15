import { Language } from '../types';

export const TRANSLATIONS = {
    es: {
        header: {
            subtitle: "Fan Fiction Generator", // Keeping it in English or "Generador de Fan Fictions"
        },
        nav: {
            myStories: "📚 Mis Historias",
            createNew: "✍️ Crear Nueva",
        },
        loading: {
            title: "Creando magia...",
            longStory: "Escribir un capítulo largo lleva un poco más de tiempo. ¡Paciencia!",
            writing: "Escribiendo...",
            interacting: "Interactuando...",
        },
        home: {
            title: "¡Crea tu propio episodio!",
            subtitle: "Elige a tus personajes favoritos y dinos qué debería pasar hoy en Salt Lake City.",
            generateButton: "🎬 ¡Acción! Generar Historia",
            selectOptions: "Completa las opciones para empezar",
            disclaimer: "Esta app usa IA para generar historias. Todo es ficción y hecho por fans para fans.",
            selectCharacters: "Elige a los personajes",
            selectGenre: "¿Qué tipo de historia quieres?",
            selectLength: "¿Cuánto quieres leer?",
            selectAtLeastOne: "* Selecciona al menos un personaje",
        },
        history: {
            emptyTitle: "Tu biblioteca está vacía",
            emptyDesc: "¡Crea tu primera historia para guardarla aquí!",
            createStory: "Crear Historia",
            myStories: "Mis Historias",
            back: "Volver",
            readFull: "Leer historia completa",
            deleteConfirm: "¿Seguro que quieres borrar esta historia?",
            deleteTooltip: "Borrar historia",
        },
        story: {
            newOriginalStory: "Nueva Historia Original",
            copy: "Copiar",
            copied: "¡Copiado!",
            print: "Imprimir / PDF",
            createAnother: "✨ Crear otra historia",
            interactiveHeader: "¿Quieres saber cómo sigue la historia? ¡Tú decides!",
            choicePrefix: "TÚ ELEGISTE",
        },
        errors: {
            generation: "Hubo un problema contactando con los escritores de East High. ¡Inténtalo de nuevo!",
            continuation: "Error continuando la historia.",
        },
        genres: {
            musical: "Musical / Ensayo",
            romance: "Romance y Crushes",
            adventure: "Aventura Fuera de East High",
            mystery: "Misterio en los Pasillos",
            comedy: "Comedia de Enredos",
        },
        lengths: {
            short: { label: "Historia Corta", desc: "Lectura rápida (aprox. 5 min)" },
            long: { label: "Capítulo de Libro", desc: "Historia muy detallada (aprox. 15-20 min)" },
        },
        loadingMessages: [
            "Afinando las guitarras...",
            "Miss Jenn está buscando el vestuario...",
            "Escribiendo la próxima canción exitosa...",
            "Los Wildcats se están reuniendo...",
            "Ensayando la coreografía...",
            "Calentando la voz...",
            "Escribiendo el guion del próximo episodio...",
            "Buscando inspiración en los pasillos de East High...",
        ]
    },
    en: {
        header: {
            subtitle: "Fan Fiction Generator",
        },
        nav: {
            myStories: "📚 My Stories",
            createNew: "✍️ Create New",
        },
        loading: {
            title: "Making magic happen...",
            longStory: "Writing a long chapter takes a bit more time. Patience!",
            writing: "Writing...",
            interacting: "Interacting...",
        },
        home: {
            title: "Create your own episode!",
            subtitle: "Pick your favorite characters and tell us what should happen today in Salt Lake City.",
            generateButton: "🎬 Action! Generate Story",
            selectOptions: "Select options to start",
            disclaimer: "This app uses AI to generate stories. All content is fan-made fiction.",
            selectCharacters: "Choose your characters",
            selectGenre: "What kind of story?",
            selectLength: "How long?",
            selectAtLeastOne: "* Select at least one character",
        },
        history: {
            emptyTitle: "Your library is empty",
            emptyDesc: "Create your first story to save it here!",
            createStory: "Create Story",
            myStories: "My Stories",
            back: "Back",
            readFull: "Read full story",
            deleteConfirm: "Are you sure you want to delete this story?",
            deleteTooltip: "Delete story",
        },
        story: {
            newOriginalStory: "New Original Story",
            copy: "Copy",
            copied: "Copied!",
            print: "Print / PDF",
            createAnother: "✨ Create another story",
            interactiveHeader: "Want to know what happens next? You decide!",
            choicePrefix: "YOU CHOSE",
        },
        errors: {
            generation: "There was a problem contacting the East High writers. Try again!",
            continuation: "Error continuing the story.",
        },
        genres: {
            musical: "Musical / Rehearsal",
            romance: "Romance & Crushes",
            adventure: "Adventure Outside East High",
            mystery: "Mystery in the Hallways",
            comedy: "Comedy of Errors",
        },
        lengths: {
            short: { label: "Short Story", desc: "Quick read (approx. 5 min)" },
            long: { label: "Book Chapter", desc: "Very detailed story (approx. 15-20 min)" },
        },
        loadingMessages: [
            "Tuning the guitars...",
            "Miss Jenn is looking for costumes...",
            "Writing the next hit song...",
            "The Wildcats are gathering...",
            "Rehearsing the choreography...",
            "Warming up vocals...",
            "Writing the script for the next episode...",
            "Seeking inspiration in the halls of East High...",
        ]
    }
};

export const getTranslation = (lang: Language) => TRANSLATIONS[lang];
