export default {
	GET_TABLEDATA (context) {
		return context.$http({
			url : 'api/table',
			methods : 'GET',
			params : {
				
			},
			body : {

			},
			before: function () {

			}
		});
	}
}