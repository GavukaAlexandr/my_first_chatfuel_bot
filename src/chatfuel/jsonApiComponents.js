async function messageWithRedirectToBlock(message, block) {
  return {
    messages: [{ text: message }],
    redirect_to_blocks: block
  };
}

async function renderOrderElementsList(orders) {
  const result = orders.map(order => ({
    title: order.name,
    image_url: order.imgUrl,
    subtitle: `size: ${order.size}, color: ${order.color}`,
  }));

  return result;
}

async function renderOrderElementsGallery(orders) {
  const result = orders.map(order => ({
    title: order.name,
    image_url: order.imgUrl,
    subtitle: `size: ${order.size}, color: ${order.color}`,
    buttons: [
      {
        url: `https://04ade901.ngrok.io/chatfuel/delete-order/${order.id}`,
        type: 'json_plugin_url',
        title: 'delete this order',
      }
    ]
  }));

  return result;
}

async function renderList(data) {
  return {
    messages: [
      {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'list',
            top_element_style: 'compact',
            elements: await renderOrderElementsList(data.get({ plain: true }).Orders),
          }
        }
      }
    ]
  };
}

async function renderGallery(data) {
  return {
    messages: [
      {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            image_aspect_ratio: 'square',
            elements: await renderOrderElementsGallery(data.get({ plain: true }).Orders),
          }
        }
      }
    ]
  };
}

module.exports = {
  messageWithRedirectToBlock,
  renderList,
  renderGallery,
};
