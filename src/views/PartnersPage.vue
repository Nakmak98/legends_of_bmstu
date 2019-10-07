<template>
	<div class="basic-block">
		<h1>Наши партнеры</h1>
    	<a href="http://questreet.ru/"><img src="@/assets/ParntersLogo.png" class="ParntersLogo"></a>
    	<br>
    	<br>
    	<p class="ql-align-center PartnersText">
    		Любишь квесты? <b>Улица Квестов</b> ждет тебя! Лучшие квесты в Москве по мнению организаторов. Всем участниками - купон на скидку!
    	</p>
    </div>
</template>

<script>
    export default {
        name: "PartnersPage",
    }
</script>

<style scoped>
.ParntersLogo
{
	margin: 0 5%;
	width: 90%;
}
.ParntersLink
{
	font-size: 24px;
	color: #e56e21;
}
.PartnersText
{
	font-size: 24px;
}
.PartnersText>b
{
	font-size: 24px;
}
</style>