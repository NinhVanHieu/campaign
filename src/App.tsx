
import { DeleteIcon, PlusCircleIcon } from '@shopify/polaris-icons';
import { Page, Layout, Card, Icon, Grid, Toast, Frame } from '@shopify/polaris';
import { useFieldArray, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { Data } from './dto/data';
import Preview from '././components/Preview';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

const App = () => {

  const [active, setActive] = useState<boolean>(false);
  const [content, setContent] = useState<string>('')


  const initialValues: Data = {
    campaign: 'Volume discount #2',
    title: 'Buy more and save',
    description: 'Apply for all product in store',
    options: [
      {
        title: 'Single',
        subtitle: 'Standard',
        label: '',
        quantity: 1,
        discount: 'None',
      },
      {
        title: 'Due',
        subtitle: 'Save 10%',
        label: 'Popular',
        quantity: 2,
        discount: '% discount',
        amount: 10
      }
    ]
  }


  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState,
    setValue,
    watch,
  } = useForm<Data>({
    defaultValues:
      initialValues,
    mode: "onChange",
  });

  const { errors } = formState
  console.log(`( errors )===============>`, errors);

  const onSubmit = (data: Data) => {
    if (data.options.length <= 0) {
      toggleActive()
      setContent("Need to add at least 1 option!")
    } else {
      // post
      // I will execute console.log andd notification
      toggleActive()
      setContent("Submitted successfully!")
      console.log("data", data);
    }
  }

  const { fields, remove } = useFieldArray({
    control,
    name: "options"
  });

  const values = watch()
  const newAddQuantity = values.options?.[values.options.length - 1]?.quantity

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast
      content={content}
      onDismiss={toggleActive}
      error={content == "Submitted successfully!" ? false : true}
      duration={3000}
    />
  ) : null;

  return (
    <div className='main mx-auto lg:max-w-[992px] xl:max-w-[1200px] xxl:max-w-[1600px]'>
      <Frame>
        {toastMarkup}
        <Page
          backAction={{ content: 'Settings', url: '/' }}
          title="Create volume discount"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Layout>
              <Layout.Section>
                <Layout>
                  <Layout.Section>
                    <Card>
                      <div className='flex flex-col gap-4' >
                        <h2 className='font-bold text-black' >General</h2>
                        <div className='control'>
                          <label htmlFor="campaign">Campaign</label>
                          <input {...register("campaign", {
                            required: {
                              value: true,
                              message: 'Campaign is requied'
                            }
                          })} className='control_input'
                            aria-invalid={errors.campaign ? "true" : "false"}
                          />
                          {errors.campaign?.type === 'required' && <p className='errors'>{errors.campaign?.message}</p>}

                        </div>
                        <div className='control'>
                          <label>Title</label>
                          <input {...register("title")} />
                        </div>
                        <div className='control'>
                          <label>Description</label>
                          <input {...register("description")} />
                        </div>

                      </div>
                    </Card>

                  </Layout.Section>
                  <Layout.Section>
                    <div className='relative'>
                      <Card>
                        <h2 className='font-bold text-black dash '>Volume discount rule</h2>
                        {fields.length > 0 && fields.map((item, index) => {
                          const handleChange = (value: string, index: number) => {
                            setValue(`options.${index}.discount`, value);
                          }
                          return (
                            <div key={item.id} className='dash relative' >
                              <span className='span_option'>OPTION {index + 1}</span>
                              <div className='mt-12 flex flex-col gap-4 mb-8'>
                                <Grid>
                                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 4 }}>
                                    <div className='control'>
                                      <label>Title</label>
                                      <input {...register(`options.${index}.title`, {
                                        required: {
                                          value: true,
                                          message: 'Title is requied'
                                        },
                                      })} />

                                      <ErrorMessage
                                        errors={errors}
                                        name={`options.${index}.title`}
                                        render={({ message }) =>
                                          message && <p className='errors'>{message}</p>
                                        }
                                      />
                                    </div>
                                  </Grid.Cell>
                                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 4 }}>
                                    <div className='control'>
                                      <label>Subtitle</label>
                                      <input {...register(`options.${index}.subtitle`)} />
                                    </div>
                                  </Grid.Cell>
                                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 4 }}>
                                    <div className='control'>
                                      <label>Label (optianal)</label>
                                      <input {...register(`options.${index}.label`)} />
                                    </div>
                                  </Grid.Cell>
                                </Grid>
                                <Grid>
                                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 4 }}>
                                    <div className='control'>
                                      <label>Quantity</label>
                                      <input type="number" {...register(`options.${index}.quantity`, {
                                        required: {
                                          value: true,
                                          message: 'Quantity is requied'
                                        },
                                        min: {
                                          value: 1,
                                          message: 'Quantity minimum value is 1'
                                        }
                                      })}
                                        min={1}
                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        name={`options.${index}.quantity`}
                                        render={({ message }) =>
                                          message && <p className='errors'>{message}</p>
                                        }
                                      />
                                    </div>
                                  </Grid.Cell>
                                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 4 }}>
                                    <div className='control'>
                                      <label>Discount type</label>
                                      <select {...register(`options.${index}.discount`)}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                      >
                                        <option value="None">None</option>
                                        <option value="% discount">% discount</option>
                                        <option value="Discount / each">Discount / each</option>
                                      </select>
                                    </div>
                                  </Grid.Cell>
                                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 4 }}>
                                    {values.options?.[index].discount === '% discount' && (
                                      <div className='control relative'>
                                        <label>Amount</label>
                                        <input {...register(`options.${index}.amount`, {
                                          required: {
                                            value: true,
                                            message: 'Amount is requied'
                                          },
                                          min: {
                                            value: 1,
                                            message: 'Amount minimum value is 1'
                                          }
                                        })}
                                          type="number"
                                          min={1}
                                        />
                                        <span className={clsx(errors?.options && 'bottom-9', 'absolute bottom-2  right-8')}>%</span>
                                        <ErrorMessage
                                          errors={errors}
                                          name={`options.${index}.amount`}
                                          render={({ message }) =>
                                            message && <p className='errors'>{message}</p>
                                          }
                                        />
                                      </div>)}

                                    {values.options?.[index].discount === 'Discount / each' && (
                                      <div className='control relative'>
                                        <label>Amount</label>
                                        <input {...register(`options.${index}.amount`, {
                                          required: {
                                            value: true,
                                            message: 'Amount is requied'
                                          },
                                          min: {
                                            value: 1,
                                            message: 'Amount minimum value is 1'
                                          }
                                        })}
                                          type="number"
                                          min={1}
                                        />
                                        <span className={clsx(errors?.options && 'bottom-9', 'absolute bottom-2  right-8')}>$</span>
                                        <ErrorMessage
                                          errors={errors}
                                          name={`options.${index}.amount`}
                                          render={({ message }) =>
                                            message && <p className='errors'>{message}</p>
                                          }
                                        />
                                      </div>)}
                                  </Grid.Cell>
                                </Grid>
                              </div>

                              <button type="button" onClick={() => remove(index)} className='absolute right-0 top-6'>
                                <Icon
                                  source={DeleteIcon}
                                  tone="base"
                                />
                              </button>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => {
                            setValue("options", [
                              ...(getValues().options || []),
                              {
                                title: '',
                                subtitle: '',
                                label: '',
                                quantity: Number(newAddQuantity) + 1,
                                discount: 'None',
                              },
                            ]);
                          }}
                          className='bg-[#ea4427] text-white flex items-center justify-center gap-2 p-2 w-full rounded-md mt-5'
                        >
                          <span className='custom_icon'>
                            <Icon
                              source={PlusCircleIcon}
                              tone="subdued"
                            />
                          </span>
                          <span> Add option</span>
                        </button>
                      </Card>
                    </div>
                  </Layout.Section>
                </Layout>

              </Layout.Section>
              <Layout.Section variant="oneThird">
                <Card>
                  <Preview values={watch()} onsubmit={onSubmit} />
                </Card>
              </Layout.Section>
            </Layout>
          </form>
        </Page >
      </Frame>
    </div>
  )


}

export default App


