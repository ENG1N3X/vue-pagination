<template>
	<div class="row">
		<AppListItem v-for="item in displayContent" :key="item.id" :item="item" />
	</div>
	<div class="row center-align">
		<button class="waves-effect waves-light btn" @click="prevPage" :disabled="sliceFrom == 0">
			<i class="material-icons left">arrow_back</i>
			Prev
		</button>
		<button class="waves-effect waves-light btn" @click="nextPage" :disabled="items.length == sliceTo">
			<i class="material-icons right">arrow_forward</i>
			Next
		</button>
	</div>
</template>

<script>
import AppListItem from "@/components/ListItem.vue"

export default {
	data() {
		return {
			items: [],
			sliceFrom: 0,
			sliceTo: 3,
		}
	},
	components: {
		AppListItem,
	},
	async created() {
		await this.fetchData()
	},
	methods: {
		async fetchData() {
			try {
				const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
				if (response.ok) {
					this.items = await response.json()
				}
			} catch (error) {
				console.error(error.message)
			}
		},
		setContent(itemsArr) {
			return itemsArr.slice(this.sliceFrom, this.sliceTo)
		},
		prevPage() {
			if (this.sliceFrom != 0) {
				this.sliceFrom--
				this.sliceTo--
			}
		},
		nextPage() {
			if (this.items.length != this.sliceTo) {
				this.sliceFrom++
				this.sliceTo++
			}
		},
	},
	computed: {
		displayContent() {
			return this.setContent(this.items)
		},
	},
}
</script>
