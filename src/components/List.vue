<template>
	<div class="row right-align">
		<a class='dropdown-trigger btn' href='#' data-target='dropdown1'>{{ sortBy }}</a>
		<ul id='dropdown1' class='dropdown-content'>
			<li><a href="#!" @click="sortBy = 'all'">All</a></li>
			<li><a href="#!" @click="sortBy = 'done'">Done</a></li>
			<li><a href="#!" @click="sortBy = 'undone'">Undone</a></li>
		</ul>
	</div>
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
import M from 'materialize-css'

const SLICE_FROM = 0;
const SLICE_TO = 3;

export default {
	name: "List",
	data() {
		return {
			items: [],
			sliceFrom: SLICE_FROM,
			sliceTo: SLICE_TO,
			sortBy: "all"
		}
	},
	components: {
		AppListItem,
	},
	async created() {
		await this.fetchData()
	},
	mounted() {
		const elems = document.querySelectorAll('.dropdown-trigger');
		M.Dropdown.init(elems, {alignment: "left"});
	},
	methods: {
		async fetchData() {
			try {
				const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=14")
				if (response.ok) {
					this.items = await response.json()
				}
			} catch (error) {
				console.error(error.message)
			}
		},
		setContent(itemsArr) {
			itemsArr = this.sort(itemsArr)

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
		sort(itemsArrToSort) {
			switch (this.sortBy) {
				case "done":
					itemsArrToSort = itemsArrToSort.filter(item => item.completed != false)
					break;
				case "undone":
					itemsArrToSort = itemsArrToSort.filter(item => item.completed != true)
					break;
			}
			return JSON.parse(JSON.stringify(itemsArrToSort))
		},
		sliceClear() {
			this.sliceFrom = SLICE_FROM
			this.sliceTo = SLICE_TO
		}
	},
	computed: {
		displayContent() {
			return this.setContent(this.items)
		},
	},
	watch: {
		sortBy: {
			handler() {
				this.sliceClear()
			}
		}
	}
}
</script>
