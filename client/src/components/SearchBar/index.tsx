import React, { useState, useCallback } from "react";
import { InlineStack, TextField, Button, Box, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleBlur = useCallback(
    () => {
      handleSearch();
    },
    [handleSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <InlineStack gap="400" wrap={false} blockAlign="center">
      <Box minWidth="40%">
        <TextField
          label="Search"
          labelHidden
          prefix={<Icon source={SearchIcon} />}
          value={searchQuery}
          placeholder="查找加密货币（名称或代码）"
          disabled={isLoading}
          autoComplete="off"
          clearButton
          onClearButtonClick={clearSearch}
          onChange={setSearchQuery}
          onBlur={handleBlur}
        />
      </Box>
      <Button
        icon={SearchIcon}
        loading={isLoading}
        onClick={handleSearch}
      >
        搜索
      </Button>
    </InlineStack>
  );
};
