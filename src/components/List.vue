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
		<button class="waves-effect waves-light btn" @click="nextPage" :disabled="itemsSorted.length == sliceTo">
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
			itemsSorted: [],
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
					this.itemsSorted = [...this.items]
				}
			} catch (error) {
				console.error(error.message)
			}
		},
		setContent(items) {
			return items.slice(this.sliceFrom, this.sliceTo)
		},
		prevPage() {
			if (this.sliceFrom != 0) {
				this.sliceFrom--
				this.sliceTo--
			}
		},
		nextPage() {
			if (this.itemsSorted.length != this.sliceTo) {
				this.sliceFrom++
				this.sliceTo++
			}
		},
		sort(items) {
			this.sliceClear()

			switch (this.sortBy) {
				case "done":
					this.itemsSorted = items.filter(item => item.completed != false)
					break;
				case "undone":
					this.itemsSorted = items.filter(item => item.completed != true)
					break;
				default:
					this.itemsSorted = items
					break;
			}
			return JSON.parse(JSON.stringify(this.itemsSorted))
		},
		sliceClear() {
			this.sliceFrom = SLICE_FROM
			this.sliceTo = SLICE_TO
		}
	},
	computed: {
		displayContent() {
			return this.setContent(this.itemsSorted)
		},
	},
	watch: {
		sortBy: {
			handler() {
				this.sort(this.items)
			}
		}
	}
}
</script>
