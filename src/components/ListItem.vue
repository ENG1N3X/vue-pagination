<template>
	<div class="col s2 m4">
		<div class="card blue-grey darken-1">
			<div class="card-content white-text">
				<span class="card-title">{{ item.title }} | {{ item.id }}</span>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta nemo delectus illum, veritatis eaque unde labore ipsum, eveniet distinctio iure libero, nobis eligendi porro ex placeat quis? Odio, amet
					asperiores?
				</p>
			</div>
			<div class="card-action">
				<a href="#">{{ item.completed }}</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ListItem",
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
}
</script>
