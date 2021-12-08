const AddElement = function (type: string, parent?: HTMLElement, properties?: {[index: string]: string}, eventListeners?: {[index: string]: EventListener}, attributes?: {[index: string]: string})
{
    let NewElement = document.createElement(type);

    for (const key in eventListeners)
    {
        NewElement.addEventListener(key, eventListeners[key]);
    }

    for (const key in attributes)
    {
        NewElement.setAttribute(key, attributes[key]);
    }

    if (parent) parent.appendChild(NewElement);

    return NewElement;
};