<script setup lang="ts">
import DocumentReader, { type ReaderDocument } from '../../components/DocumentReader.vue'
import doc from '../../content/read/fieldbook.json'
</script>

<template>
  <DocumentReader :doc="doc as ReaderDocument" />
</template>
