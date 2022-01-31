# Prérequis

## Installer Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Installer NVM

```bash
brew install nvm
```

```bash
mkdir ~/.nvm
```

```bash
export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"
```

## Installer Node 16

```bash
nvm install 16
```

## Utiliser Node 16

```bash
nvm use 16
```

## Installer le paquet de manière globale

```bash
npm install -g @eikon/starterkit-cli
```

# Utilisation

## Utiliser Node 16

```bash
nvm use 16
```

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
