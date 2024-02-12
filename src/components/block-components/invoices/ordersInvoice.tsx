import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface InvoiceDetails {
    details: any
}
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
	},
	section: {
		flexGrow: 1,
	},
});


function OrdersInvoiceDownload({details}:InvoiceDetails ) {
  return (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Yebbo Invoice Design With Datat Will go here</Text>
			</View>
			<View style={styles.section}>
				<Text>{details?.status} ALL THE DETAILS HERE</Text>
			</View>
		</Page>
	</Document>
  )
}

export default OrdersInvoiceDownload
