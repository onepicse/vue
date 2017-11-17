<template>
	<div class="table-wrap">
		<table class="table" width="960" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th v-for="item in tableHeadData">{{ item }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data, index) in tableBodyData">
					<td v-for="item in data">{{ item }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		props: {
			tableBodyData: {
				type: Array
			},
			tableHeadData: {
				type: Array
			}
		},
		data () {
			return {

			}
		}
	}
</script>

<style lang="less">
.table-wrap{
	width: 960px;
	height: 100%;
	margin: 0 auto;
	.table{
		thead th {
			height: 48px;
		    padding: 0;
		    font-size: 12px;
		    line-height: 48px;
		    text-align: center;
		    border-top: 1px solid #eeeeef;
		    border-bottom: 1px solid #eeeeef;
		    color: #292929;
		    background-color: #f6f7f7;
		    font-weight: bold;
		}
		tbody td {
			height: 48px;
		    padding: 0;
		    font-size: 12px;
		    line-height: 18px;
		    text-align: center;
		}
	}
}
</style>