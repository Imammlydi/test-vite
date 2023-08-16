import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCellHeader: {
        margin: "auto",
        marginTop: 5,
        marginBottom: 5,
        fontWeight: "bold",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        marginBottom: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
});

const ReportTable = ({ data }) => {
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>{data.title}</Text>
                <Text style={styles.tableCellHeader}></Text>
            </View>
            {Object.entries(data.content).map(([key, value]) => (
                <View style={styles.tableRow} key={key}>
                    <Text style={styles.tableCell}>{key}</Text>
                    <Text style={styles.tableCell}>{value}</Text>
                </View>
            ))}
        </View>
    );
};

const EquipmentReport = () => {
    const data = {
        title: "Equipment",
        content: {
            name: "Molen",
            qty: 5,
        },
    };

    return <ReportTable data={data} />;
};

const WorkerReport = () => {
    const data = {
        title: "Worker",
        content: {
            type_of_worker: "Welder",
            qty: 5,
        },
    };

    return <ReportTable data={data} />;
};

const WorkingHoursReport = () => {
    const data = {
        title: "Working Hours",
        content: {
            working_name: "Grouting",
            length: 5,
        },
    };

    return <ReportTable data={data} />;
};

const ReportPdf = () => {
    return (
        <Document>
            <Page>
                <EquipmentReport />
                <WorkerReport />
                <WorkingHoursReport />
            </Page>
        </Document>
    );
};

export default ReportPdf;
