module ApplicationHelper
  def user_icon(user, class_name)
    if user.avatar?
      image_tag user.avatar_url, class: class_name
    elsif user.image?
      image_tag user.image, class: class_name
    else
      fa_icon "user-circle", class: "fa-2x #{class_name}"
    end
  end
end
