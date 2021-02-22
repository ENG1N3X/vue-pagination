<template>
	<div class="col s2 m4">
		<div class="card blue-grey darken-1">
			<div class="card-content white-text">
				<span class="card-title">{{ item.title }} | {{ item.id }}</span>
				<p>{{ item.body }}</p>
			</div>
			<!-- <div class="card-action">
				<a href="#">This is a link</a>
				<a href="#">This is a link</a>
			</div> -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
}
</script>
