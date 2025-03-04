```mermaid
%%{init: {'theme':'neutral'}}%%
classDiagram
    class PassboltResponsePaginationHeaderEntity {
        integer|null limit
        integer count
        integer page
        integer pageCount()
    }

    class PassboltResponseHeaderEntity {
        PassboltResponsePaginationHeaderEntity pagination
    }

    class PassboltResponseEntity{
        PassboltResponseHeaderEntity header
        object|string|array|null body
    }

    PassboltResponseEntity--*PassboltResponseHeaderEntity
    PassboltResponseHeaderEntity--*PassboltResponsePaginationHeaderEntity
```
