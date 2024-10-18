import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
    RefreshControl,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faMagnifyingGlass,
    faArrowRight,
    faArrowLeft,
    faSliders,
    faSort,
    faSortUp,
    faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import StatusBarNew from '../components/statusbars';
import { MainNavbar } from '../components/navbars';
import tw from '../utils/tailwind';

const inventoryData = [
    { name: 'Selang', ctg: 'Tech', sku: 'SLG1', qty: 3, loc: 'WH1' },
    { name: 'Pipa', ctg: 'Tech', sku: 'PP1', qty: 1, loc: 'WH3' },
    { name: 'Dripstick', ctg: 'Tech', sku: 'DP1', qty: 1, loc: 'WH4' },
    { name: 'Cocopit', ctg: 'Agro', sku: 'CCP1', qty: 1, loc: 'WH5' },
    { name: 'Pupuk A', ctg: 'Agro', sku: 'PPUKA1', qty: 1, loc: 'WH2' },
    { name: 'Pupuk B', ctg: 'Agro', sku: 'PPUKB1', qty: 1, loc: 'WH1' },
    // Add more items as necessary...
];

const TableScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [filterCategory, setFilterCategory] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // Filter data based on search and category
    const filteredData = inventoryData.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            item.ctg.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            item.sku.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesCategory = filterCategory
            ? item.ctg === filterCategory
            : true;

        return matchesSearch && matchesCategory;
    });

    // Sorting
    const sortedData = React.useMemo(() => {
        if (sortConfig.key) {
            return [...filteredData].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return filteredData;
    }, [filteredData, sortConfig]);

    // Calculate pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;
    const currentData = sortedData.slice(startItem, endItem);

    // Pagination Handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleItemsPerPageChange = (number) => {
        setItemsPerPage(number);
        setCurrentPage(1); // Reset to first page when changing items per page
        setModalVisible(false); // Close modal
    };

    // Sorting Handler
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Pull to Refresh Handler
    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000); // Simulated refresh delay
    }, []);

    return (
        <View style={tw`flex-1 bg-gray-100`}>
            <StatusBarNew />
            <MainNavbar
                navigation={navigation}
                title={'Inventory Table'}
            />

            {/* Search Bar */}
            <View style={tw`flex-row items-center bg-white p-3 mb-2 shadow rounded-md`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="#000" />
                <TextInput
                    style={tw`flex-1 ml-2 text-base font-medium text-gray-600`}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faSliders} size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Table Header with Sorting */}
            <View style={tw`flex-row justify-between bg-blue-600 p-2 rounded-md`}>
                {['name', 'ctg', 'sku', 'qty', 'loc'].map((key) => (
                    <TouchableOpacity
                        key={key}
                        style={tw`flex-1 items-center`}
                        onPress={() => handleSort(key)}
                    >
                        <View style={tw`flex-row items-center`}>
                            <Text style={tw`text-white font-bold`}>
                                {key.toUpperCase()}
                            </Text>
                            {sortConfig.key === key ? (
                                sortConfig.direction === 'ascending' ? (
                                    <FontAwesomeIcon
                                        icon={faSortUp}
                                        size={14}
                                        color="#fff"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        size={14}
                                        color="#fff"
                                    />
                                )
                            ) : (
                                <FontAwesomeIcon
                                    icon={faSort}
                                    size={14}
                                    color="#fff"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {currentData.length > 0 ? (
                <FlatList
                    data={currentData}
                    keyExtractor={(item, index) => item.sku + index}
                    renderItem={({ item }) => (
                        <View style={tw`flex-row justify-between p-2 bg-white my-1 rounded-md shadow`}>
                            <Text style={tw`flex-1 text-center text-gray-700`}>{item.name}</Text>
                            <Text style={tw`flex-1 text-center text-gray-700`}>{item.ctg}</Text>
                            <Text style={tw`flex-1 text-center text-gray-700`}>{item.sku}</Text>
                            <Text style={tw`flex-1 text-center text-gray-700`}>{item.qty}</Text>
                            <Text style={tw`flex-1 text-center text-gray-700`}>{item.loc}</Text>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                    }
                />
            ) : (
                <Text style={tw`text-center text-red-600 mt-4`}>No items found</Text>
            )}

            <View style={tw`flex-row justify-center items-center my-4`}>
                <TouchableOpacity
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                    style={tw`p-2`}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={24}
                        color={currentPage === 1 ? '#ccc' : '#000'}
                    />
                </TouchableOpacity>
                <Text style={tw`mx-4 text-lg font-semibold text-gray-600`}>
                    {currentPage} / {totalPages}
                </Text>
                <TouchableOpacity
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={tw`p-2`}
                >
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        size={24}
                        color={currentPage === totalPages ? '#ccc' : '#000'}
                    />
                </TouchableOpacity>
            </View>

            {/* Modal for Items Per Page & Category Filter */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-30`}>
                    <View style={tw`w-80 bg-blue-600 p-5 rounded-md shadow-md`}>
                        <Text style={tw`text-xl text-white font-bold mb-4`}>
                            Filter & Display Options
                        </Text>

                        {/* Items Per Page Header */}
                        <Text style={tw`text-lg text-white font-semibold mb-3`}>
                            Items Per Page
                        </Text>
                        {[5, 10, 15].map((number) => (
                            <TouchableOpacity
                                key={number}
                                onPress={() => handleItemsPerPageChange(number)}
                                style={tw`w-full py-2 bg-white mb-2 rounded-md items-center`}
                            >
                                <Text style={tw`text-lg text-blue-600 font-semibold`}>
                                    {number} Items
                                </Text>
                            </TouchableOpacity>
                        ))}

                        {/* Category Filter Header */}
                        <Text style={tw`text-lg text-white font-semibold mb-3`}>
                            Filter by Category
                        </Text>
                        {['All', 'Tech', 'Agro', 'Tools', 'Furniture', 'Office Supplies', 'Accessories'].map(
                            (category) => (
                                <TouchableOpacity
                                    key={category}
                                    onPress={() => setFilterCategory(category === 'All' ? null : category)}
                                    style={tw`w-full py-2 bg-white mb-2 rounded-md items-center`}
                                >
                                    <Text style={tw`text-lg text-blue-600 font-semibold`}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}

                        <Pressable
                            style={tw`w-full py-2 bg-gray-400 rounded-md items-center mt-3`}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={tw`text-white font-semibold`}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TableScreen;
