import { ReadonlyURLSearchParams } from "next/navigation";

export const queryStringBuilder = (
  searchParams: { [key: string]: string },
  category: string = ""
) => {
  let final_query_string: { [key: string]: string | number } = {
    per_page: 100,
    "filter[product_cat]": category,
    order: "desc",
  };

  let or = searchParams.orderby;
  const orderByParams = handleOrderByParams(or);
  final_query_string = {
    ...final_query_string,
    ...orderByParams,
  };
  if (searchParams.tags) {
    const tagList = searchParams.tags.split(",");
    final_query_string = {
      ...final_query_string,
      "filter[product_tag]": searchParams.tags,
    };
  }

  if (searchParams.weight) {
    const weightList = searchParams.weight.split("|");
    final_query_string = {
      ...final_query_string,
      "filter[tax_query][0][taxonomy]": "pa_weight",
      "filter[tax_query][0][field]": "slug",
      "filter[tax_query][0][operator]": "IN",
    };

    weightList.map((item, indx) => {
      final_query_string = {
        ...final_query_string,
        [`filter[tax_query][0][terms][${indx}]`]: item,
      };
    });
  }

  if (searchParams.tags) {
    const tagList = searchParams.tags.split("|");

    final_query_string = {
      ...final_query_string,
      "filter[product_tag]": tagList.join(","),
    };
  }

  let lastIndex = -1;

  if (searchParams.status) {
    const statuses = searchParams.status.split("|");
    statuses.map((item, index) => {
      if (item === "in_stock") {
        final_query_string = {
          ...final_query_string,
          [`filter[meta_query][${index}][key]`]: "_stock_status",
          [`filter[meta_query][${index}][value]`]: "instock",
        };
      } else if (item === "onbackorders") {
        final_query_string = {
          ...final_query_string,
          [`filter[meta_query][${index}][key]`]: "_backorders",
          [`filter[meta_query][${index}][value]`]: "yes",
        };
      } else if (item === "on_sale") {
        final_query_string = {
          ...final_query_string,
          [`filter[meta_query][${index}][key]`]: "_sale_price",
          [`filter[meta_query][${index}][value]`]: 0,
          [`filter[meta_query][${index}][compare]`]: ">",
          [`filter[meta_query][${index}][type]`]: "numeric",
        };
      } else if (item === "featured") {
        final_query_string = {
          ...final_query_string,
          [`filter[meta_query][${index}][key]`]: "_featured",
          [`filter[meta_query][${index}][value]`]: "yes",
        };
      }

      lastIndex = index;
    });
  }

  if (searchParams.price) {
    const price = searchParams.price.split("|");
    lastIndex++;
    final_query_string = {
      ...final_query_string,
      [`filter[meta_query][${lastIndex}][key]`]: "_price",
      [`filter[meta_query][${lastIndex}][compare]`]: "BETWEEN",
      [`filter[meta_query][${lastIndex}][type]`]: "NUMERIC",
      [`filter[meta_query][${lastIndex}][value][0]`]: price[0],
      [`filter[meta_query][${lastIndex}][value][1]`]: price[1],
    };
  }

  // This is in last place where we want to exclude certain categories
  final_query_string = {
    ...final_query_string,
    [`filter[tax_query][${lastIndex}][taxonomy]`]: "product_cat",
    [`filter[tax_query][${lastIndex}][field]`]: "slug",
    [`filter[tax_query][${lastIndex}][terms]`]: "peptide-market",
    [`filter[tax_query][${lastIndex}][operator]`]: "NOT IN",
  };
  return final_query_string;
};

const handleOrderByParams = (
  orderBy: string
): { [key: string]: string | number } => {
  switch (orderBy) {
    case "rating":
      return {
        "filter[meta_key]": "_wc_average_rating",
        "filter[orderby]": "meta_value_num",
        order: "asc",
      };
    case "date":
      return {
        orderby: "date",
      };
    case "price":
      return {
        order: "asc",
        "filter[meta_key]": "_price",
        "filter[orderby]": "meta_value_num",
      };
    case "price-desc":
      return {
        "filter[meta_key]": "_price",
        "filter[orderby]": "meta_value_num",
      };
    default:
      return {
        "filter[meta_key]": "total_sales",
        "filter[orderby]": "meta_value_num",
      };
  }
};

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string,
  valueLength?: number
) => {
  const params = new URLSearchParams(searchParams);
  if (valueLength) params.set(name, value);
  else params.delete(name);

  return params.size ? `?${params.toString()}` : "";
};

export const removeFromQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string
) => {
  const params = new URLSearchParams(searchParams);
  params.delete(name);

  return params.toString();
};
