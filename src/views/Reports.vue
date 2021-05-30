<template>
  <div>
    <tw-report
      v-for="report in reports"
      :key="report.id"
      :report="report"
      @onremove="removeReport"
    />
  </div>
</template>

<script>
import axios from "../utils/axios";

export default {
  data() {
    return {
      reports: [],
    };
  },
  mounted: function () {
    axios.get("/reports").then(({ data }) => {
      this.reports = data;
    });
  },
  methods: {
    removeReport(report) {
      const index = this.reports.findIndex((q) => q.id === report.id);
      this.reports.splice(index, 1);
    },
  },
};
</script>
