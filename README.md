# Prérequis

## Installer Xcode Command Line Tools

```bash
xcode-select --install
```

## Installer Node.js

1.  Sur [nodejs.org](https://nodejs.org), télécharger la version **LTS**

2.  Installer le logiciel

3.  Régler les problèmes de droits:

        mkdir ~/.npm-global
        npm config set prefix '~/.npm-global'
        echo 'export PATH=~/.npm-global/bin:$PATH' > .zshrc
        source ~/.zshrc

# Installation

```bash
npm install -g @eikon/starterkit-cli
```

# Utilisation

## Créer un nouveau site

```bash
starterkit-create
```

## Lancer le site en mode développement

```bash
npm run dev
```

## Construire le site pour la production

```bash
npm run build
```
