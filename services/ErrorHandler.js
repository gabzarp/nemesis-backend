const messages = {
    /* User */
    "MISSING_FIELD": "É necessário preencher todos os campos.",
    "INVALID_PASSWORD": "A senha precisa contar no minimo 6 caracteres.",
    "INVALID_EMAIL": "Esse não é um email válido.",
    "INVALID_PHONE": "Esse não é um número de telefone válido.",
    "INVALID_VALUE": "Você precisa selecionar um valor.",
    "EMAIL_ALREADY_REGISTERED": "Esse email já está sendo usado.",
    "PHONE_ALREADY_REGISTERED": "Esse número de telefone já está sendo usado.",
    "USERNAME_ALREADY_REGISTERED": "Esse username já está sendo usado.",
    "FIREBASE_USER_CREATION_FAILED": "Ocorreu uma falha ao adicionar esse usuário no Firebase.",
    "DATABASE_USER_CREATION_FAILED": "Ocorreu uma falha ao adicionar esse usuário no banco de dados.",
    "USER_NOT_AUTHENTICATED": "Você precisa fazer login para acessar esse recurso.",
    "USER_DONT_HAVE_PERMISSION": "O usuário não possui permissão para acessar esse recurso",
    "LOBBY_CREATION_FAILED": "Ocorreu um erro ao criar o lobby.",
    /* Currency */
    "CURRENCY_ALREADY_EXISTS": "Essa moeda já está cadastrada.",
    "CURRENCY_CREATION_FAILED": "Falha ao criar a nova moeda.",
}

function ErrorHandler(ctx, status, code) {
    ctx.status = status;
    ctx.body = messages[code] || "Nenhuma mensagem definida para esse código de erro.";
    return ctx;
}

module.exports = {
    ErrorHandler
}