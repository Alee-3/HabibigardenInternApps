import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faArrowRight, faArrowLeft, faSliders } from '@fortawesome/free-solid-svg-icons';

const inventoryData = [
    { name: 'Selang', ctg: 'Tech', sku: 'SLG1', qty: 3, loc: 'WH1' },
    { name: 'Pipa', ctg: 'Tech', sku: 'PP1', qty: 1, loc: 'WH3' },
    { name: 'Dripstick', ctg: 'Tech', sku: 'DP1', qty: 1, loc: 'WH4' },
    { name: 'Cocopit', ctg: 'Agro', sku: 'CCP1', qty: 1, loc: 'WH5' },
    { name: 'Pupuk A', ctg: 'Agro', sku: 'PPUKA1', qty: 1, loc: 'WH2' },
    { name: 'Pupuk B', ctg: 'Agro', sku: 'PPUKB1', qty: 1, loc: 'WH1' },
    { name: 'Baut', ctg: 'Tech', sku: 'BT1', qty: 1, loc: 'WH3' },
    { name: 'Besi', ctg: 'Tech', sku: 'BS1', qty: 1, loc: 'WH16' },
    { name: 'Case', ctg: 'Tech', sku: 'CS1', qty: 1, loc: 'WH1' },
    { name: 'Stick', ctg: 'Tech', sku: 'STK1', qty: 1, loc: 'WH1' },
    // Add more items here as needed
];

const TableScreen = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);

    // Filter data based on search input
    const filteredData = inventoryData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.ctg.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;
    const currentData = filteredData.slice(startItem, endItem);

    // Pagination Handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleItemsPerPageChange = (number) => {
        setItemsPerPage(number);
        setCurrentPage(1); // Reset to first page when changing items per page
        setModalVisible(false); // Close modal
    };

    return (
        <View style={styles.container}>
            {/* Inventory Table Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Inventory Table</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="#000" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faSliders} size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>CTG</Text>
                <Text style={styles.headerCell}>SKU</Text>
                <Text style={styles.headerCell}>Qty</Text>
                <Text style={styles.headerCell}>LOC</Text>
            </View>

            {/* Table Data */}
            {currentData.length > 0 ? (
                <FlatList
                    data={currentData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.ctg}</Text>
                            <Text style={styles.cell}>{item.sku}</Text>
                            <Text style={styles.cell}>{item.qty}</Text>
                            <Text style={styles.cell}>{item.loc}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noDataText}>No items found</Text>
            )}

            {/* Pagination */}
            <View style={styles.pagination}>
                <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color={currentPage === 1 ? '#ccc' : '#000'} />
                </TouchableOpacity>
                <Text style={styles.pageNumber}>{currentPage}</Text>
                <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color={currentPage === totalPages ? '#ccc' : '#000'} />
                </TouchableOpacity>
            </View>

            {/* Modal for Items Per Page */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Items Per Page</Text>
                        <TouchableOpacity onPress={() => handleItemsPerPageChange(5)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>5 Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleItemsPerPageChange(10)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>10 Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleItemsPerPageChange(15)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>15 Items</Text>
                        </TouchableOpacity>
                        <Pressable style={styles.modalButtonClose} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f9f9f9',
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#2c3e50',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    searchBarContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        backgroundColor: '#34495e',
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        borderRadius: 8,
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    pageNumber: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 12,
        color: '#333',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#e74c3c',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#3498db',
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalButtonClose: {
        width: '100%',
        padding: 12,
        backgroundColor: '#aaa',
        borderRadius: 8,
        alignItems: 'center',
    },
});

export default TableScreen;
