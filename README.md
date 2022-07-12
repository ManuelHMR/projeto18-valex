# projeto18-valex

-> Para criar um cartão
 - POST /create-card

	- necessário headers. { "x-api-key" : "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"}
	- body: {</br>
	    "workerIdentifier": 1,         <= id do usuário dono do cartão </br>
	    "cardType": "transport" </br>
	    } </br>
ATENÇÃO: Você receberá o numero do cartao, cvc e a data de validade do cartão como uma resposta da api.
É o único momento que a aplicação enviará ele decriptado, use para as
próximas requisições



-> Para ativar um cartão
 - POST /ativate-card
	-body {</br>
		"number": XXXXX XXXXX XXXXX XXXXX <==== Numero do cartao, </br>
		"cardholderName" "Fulano S Driven" <=== Nome do Cartao, </br>
		"expirationDate": "XX-XX" <============ Data que expira o cartao, </br>
		"securityCode": "589",  <============== Use o cvc que foi recebido na req de criar cartão </br>
		"password":"1234" </br>
		} </br>



-> Para ver as transações
 - GET /transactions/:id    <====== id do cartao



-> Para bloquear um cartão
 - POST /block-card
	- body { </br>
		"id":2,          <=============== id do cartão </br>
   		"password":"1234" </br>
		} </br>
		
		

-> Para desbloquear um cartão
 - POST /unblock-card
	- body {
		"id":2,          <=============== id do cartão </br>
		"password":"1234" </br>
		}



 -> Para recarregar um cartão
 - POST /recharge
	- necessário headers. { "x-api-key" : "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"}
	- body { </br>
		"id": 1,          <=============== id do cartão
		"quantity": 300 </br>
		} </br>
		
		
		
-> Para registrar um gasto
 - POST /payment
	-body { </br>
		"id": 1,       <=============== id do cartão </br>
		"password":"1234", </br>
		"businessId": 1,  <=============== lembre de respeitar o tipo do negócio e sua compactibilidade com o cartão </br>
		"quantity": 300 </br>
		} </br>
