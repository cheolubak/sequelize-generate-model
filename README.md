# sequelize-generate-model

sequelize-generate-model is a generation sequelize model.
## Installation

```bash
$ npm i -D sequelize-generate-model
```
or
```bash
$ npm i -g sequelize-generate-model
```

## Usage

```bash
$ npx sequelize-generate-model
```
or
```bash
$ npx sequelize-generate-model g -M <module> -m <model> -u [underscore] -c [charset] -f [filename] -p [path]

Command:
    g | generate       Generate sequelize model file

Options:
    -v | --version     Show version
    -h | --help        Show help
    -M | --module      js[javascript] or ts[typescript]
    -m | --model       Model name
    -u | --underscore  Whether to add underscore to database column(Y/N)
    -c | --charset     utf8 or utf8mb4
    -f | --filename    File name
    -p | --path        Generate file path
```
or
```bash
$ sequelize-generate-model
```
or
```bash
$ sequelize-generate-model g -M <module> -m <model> -u [underscore] -c [charset] -f [filename] -p [path]

Command:
    g | generate       Generate sequelize model file

Options:
    -v | --version     Show version
    -h | --help        Show help
    -M | --module      js[javascript] or ts[typescript]
    -m | --model       Model name
    -u | --underscore  Whether to add underscore to database column(Y/N)
    -c | --charset     utf8 or utf8mb4
    -f | --filename    File name
    -p | --path        Generate file path
```


## License
[MIT](https://choosealicense.com/licenses/mit/)