# projeto18-valex

-> Para criar um cartão
 - POST /create-card

	- necessário headers. { "x-api-key" : "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"}
	- body: {
	    "workerIdentifier": 1,         <= id do usuário dono do cartão
	    "cardType": "transport"
	    }
ATENÇÃO: Você receberá o numero do cartao, cvc e a data de validade do cartão como uma resposta da api.
É o único momento que a aplicação enviará ele decriptado, use para as
próximas requisições



-> Para ativar um cartão
 - POST /ativate-card
	-body {
		"number": XXXXX XXXXX XXXXX XXXXX <==== Numero do cartao,
		"cardholderName" "Fulano S Driven" <=== Nome do Cartao,
		"expirationDate": "XX-XX" <============ Data que expira o cartao,
		"securityCode": "589",  <============== Use o cvc que foi recebido na req de criar cartão
		"password":"1234"
		}



-> Para ver as transações
 - GET /transactions/:id    <====== id do cartao



-> Para bloquear um cartão
 - POST /block-card
	- body {
		"id":2,          <=============== id do cartão
   		"password":"1234"
		}
		
		

-> Para desbloquear um cartão
 - POST /unblock-card
	- body {
		"id":2,          <=============== id do cartão
		"password":"1234"
		}



 -> Para recarregar um cartão
 - POST /recharge
	- necessário headers. { "x-api-key" : "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"}
	- body {
		"id": 1,          <=============== id do cartão
		"quantity": 300
		}
		
		
		
-> Para registrar um gasto
 - POST /payment
	-body {
		"id": 1,       <=============== id do cartão
		"password":"1234",
		"businessId": 1,  <=============== lembre de respeitar o tipo do negócio e sua compactibilidade com o cartão
		"quantity": 300
		}
