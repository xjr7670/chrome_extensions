var city = localStorage.city;
city = city ? city:"guangzhou";
document.getElementById('city').value = city;
document.getElementById('save').onclick = function() {
    localStorage.city = document.getElementById('city').value;
    alert('Saved!');
}