```mermaid
%%{init: {'theme':'neutral'}}%%
classDiagram

    class SecretData {
        <<Abstract>>
        +constructor(dto, options)
        +static getSchema() Object
    }
```
