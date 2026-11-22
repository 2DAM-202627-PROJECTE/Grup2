# Landing page — Vite + Tailwind CSS v4 + Alpine.js

Landing page per a Sonora, una aplicació de música, feta amb JavaScript pur (Vanilla JS), Alpine.js, Vite i Tailwind CSS v4. Sense React, sense TypeScript i sense cap framework pesat.

## 📋 Taula de continguts
Requisits previs
Instal·lació i execució
Estructura del projecte
Configuració de fitxers
Com funcionen les plantilles (header i footer)
Components destacats
Afegir una pàgina nova
Resolució d'errors comuns
Comandes utilitzades
Notes
Contacte

## 🛠️ Requisits previs

- Node.js 20.19+ o 22.12+
- npm
- Git per clonar el repositori

## Instal·lació i execució

1. Clonar el projecte
```bash
git clone https://github.com/2DAM-202627-PROJECTE/Grup2.git
cd Grup2
```

2. Instal·lar les dependències
```bash
npm install
```

3. Arrencar en mode desenvolupament
```bash
npm run dev
```

## Compilar per a producció

```bash
npm run build
npm run preview
```

## Compilar per a desenvolupament

```bash
npm run dev
```

## 📁Estructura del projecte

<img width="651" height="510" alt="image" src="https://github.com/user-attachments/assets/50deeb17-f24e-434f-bf7a-fbc7c523b62a" />


## 🧩 Funcionament de les plantilles (header i footer)

Per no repetir el header i el footer a totes les pàgines, viuen en dos fitxers únics:

src/plantilles/header.html
src/plantilles/footer.html

El plugin d'includes del vite.config.js substitueix els comentaris <!-- include:header --> i <!-- include:footer --> pel contingut d'aquests fitxers abans de servir la pàgina. Així, un canvi al menú o al peu es veu a totes les pàgines alhora.

## 💻 Comandes utilitzades
Comanda	            Descripció
npm install	        Instal·la les dependències del projecte.
npm run dev	        Inicia el servidor local de desenvolupament (HMR actiu).
npm run build	      Compila el projecte per a producció a la carpeta dist/.
npm run preview	    Mostra una vista prèvia local de la versió de producció.

## 📝 Notes
Els formularis (login.html, register.html, contactans.html) són demostratius: mostren un missatge de confirmació, però no envien dades a cap servidor.
Projecte convertit a JavaScript sense React ni TypeScript.

## 📬 Contacte

sonorasenselimits@gmail.com

## 🤫 Contrasenya

sonora123.
