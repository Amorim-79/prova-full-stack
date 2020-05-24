# My Tasks
Cadastro e login de usuário. Criação, listagem, atualização de status e exclusão de tarefas.

[Base URL: http://localhost:3333]

# User

## Post
### /register
Cria um novo usuário
### Parameters:
#### Body: *required
| name | type | specif |
| ------------------- | ------------------- | ------------------- |
| user | string | required |
| password | string | required |

Example value:
```
{
	"user": "Pedro",
	"password": "123456789"
} 
```
### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  200 |  successful |

Example value:
```
{
  "response": [
    2
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTAxMjMxMTQsImV4cCI6MTU5MDIwOTUxNH0.Zex63-qmHSu52eQkEROFYomkAF7IxU-T3YvnJ600rpI"
}
```

## Post
### /login
Realiza o login de um usuário
### Parameters:
#### Body: *required
| name | type | specif |
| ------------------- | ------------------- | ------------------- |
| user | string | required |
| password | string | required |

Example value:
```
{
	"user": "WebTestador",
	"password": "147258"
}
```
### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  200 |  successful |

Example value:
``` 
{
  "response": {
    "id": 3,
    "user": "WebTestador"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTkwMTc0NDkxLCJleHAiOjE1OTAyNjA4OTF9.hesnkXkjVA6vKKluR4gNNqMapuHgz5K4D2gmy9Ctiag"
}
```

| Code  |  Description  |
| ------------------- | ------------------- |
|  400 | Invalid username/password |

# Task

## Post
### /tasks
Cria uma nova tarefa
### Parameters:
#### Body: *required
| name | type | specif |
| ------------------- | ------------------- | ------------------- |
| title | string | required |
| description | string | required |
| category | string | required |
| initial_date | date | optional |
| final_date | date | optional |

Example value:
``` 
{
	"title": "Comprar cenoura",
	"description": "Ir ao mercado comprar cenoura",
	"category": "Compras",
	"initial_date": "2020-05-23T03:19",
	"final_date": "2020-05-24T03:19"
}
```
#### Header: *required
| user |  authorization  |
| ------------------- | ------------------- |
| user_id |  token  |


### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  200 |  successful |

Example value:
```
[
  15
]
```

| Code  |  Description  |
| ------------------- | ------------------- |
|  400 |  Invalid task |

## Get
### /tasks
Lista as tarefas do usuário logado
### Parameters:
#### Params:
| category |  * or category selected  | é passada a categoria selecionada ou com * mostra todas |
| ------------------- | ------------------- | ------------------- |

#### Header: *required
| user |  authorization  |
| ------------------- | ------------------- |
| user_id |  token  |

### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  200 |  successful |

Example value:
```
[
  {
    "id": 10,
    "title": "Documentar API",
    "description": "Documentar a API utilizando o Swagger",
    "category": "Prova",
    "status": 0,
    "initial_date": "2020-05-23T03:19",
    "final_date": "2020-05-24T03:19",
    "user_id": 3
  },
  {
    "id": 16,
    "title": "Push frontend para o Github",
    "description": "commitar e dar push no frontend para o Github",
    "category": "Prova",
    "status": 1,
    "initial_date": "",
    "final_date": "",
    "user_id": 3
  }
]
```

## Put
### /task/{id}
Atualiza o status da tarefa para concluida (true / false)
### Parameters:
#### Params:
| id |  id  | É passado a id da task |
| ------------------- | ------------------- | ------------------- |

#### Header: *required
| user | authorization  |
| ------------------- | ------------------- |
| user_id |  token  |

### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  204 |  successful No content |

| Code  |  Description  |
| ------------------- | ------------------- |
|  401 |  unathorized |

## Delete
### /task/{id}
Deleta a tarefa escolhida
### Parameters:
#### Params:
| id |  id  | É passado a id da task |
| ------------------- | ------------------- | ------------------- |

#### Header: *required
| user |  authorization  |
| ------------------- | ------------------- |
| user_id |  token  |

### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  204 |  successful No content |

| Code  |  Description  |
| ------------------- | ------------------- |
|  401 |  unathorized |

# Category

## Get
### /categorys
Lista todas as categorias existentes sem repeti-las
### Parameters:
#### Header: *required
| user |  authorization  |
| ------------------- | ------------------- |
| user_id |  token  |

### Responses:

| Code  |  Description  |
| ------------------- | ------------------- |
|  200 |  successful |

Example value:
```
[
  {
    "category": "Prova"
  },
  {
    "category": "Teste"
  }
]
```

# Models
### User

| Id  |  User  | Password |
| ------------------- | ------------------- | ------------------- |
|  Int |  String | String |

### Task

| Id  |  Title  | Description | Category | Status | Initial Date | Final Date | Id User |
| ------------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
|  Int |  String | String | String | Boolean | Date | Date | Int |
