import {
    IndexTable,
    Card,
    Box,
    BlockStack,
} from '@shopify/polaris';

import { Data } from "../dto/data"
import { useId } from 'react';

export interface Props {
    values: Data
    onsubmit: (value: Data) => void;
}
const Preview: React.FC<Props> = ({ values }) => {
    const id = useId()
    const rowMarkup = values.options.map((item, index) => (
        <IndexTable.Row
            id={id}
            key={index}
            position={index}
        >
            <IndexTable.Cell>{item.title}</IndexTable.Cell>
            <IndexTable.Cell>{item.discount}</IndexTable.Cell>
            <IndexTable.Cell>{isNaN(item.quantity) ? null : item.quantity}</IndexTable.Cell>
            <IndexTable.Cell>{item.amount} {item.discount === '% discount' ? "%" : (item.discount === 'Discount / each' ? "$" : "")}</IndexTable.Cell>

        </IndexTable.Row>
    )
    )

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='font-bold text-black'>Preview</h2>
            <h3 className='flex justify-center font-bold'>{values.title}</h3>
            <p className='font-medium'>{values.description}</p>
            {values.options.length > 0 && (
                <div className="buttons">
                    <Box paddingBlockEnd="400">
                        <BlockStack gap="200">
                            <Card>
                                <IndexTable
                                    itemCount={values.options.length}
                                    headings={[
                                        { title: 'Title' },
                                        { title: 'Discount Type' },
                                        { title: 'Quantity' },
                                        { title: 'Amount' },
                                    ]}
                                    selectable={false}
                                >
                                    {rowMarkup}
                                </IndexTable>
                            </Card>
                        </BlockStack>
                    </Box>
                </div>
            )}

            <button type="submit" onClick={() => onsubmit} className='rounded-md p-2 bg-[#ea4427] text-white'>
                Submit
            </button>
        </div>
    )
}

export default Preview



